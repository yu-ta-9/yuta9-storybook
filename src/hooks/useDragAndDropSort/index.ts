import { useState, useRef, useMemo } from 'react';

type Position = {
  x: number;
  y: number;
};

type DragAndDropSortItem<T> = {
  value: T; // useDnDSort()の引数に渡された配列の要素の値
  key: string; // 要素と紐づいた一意な文字列
  position: Position; // 要素の座標
  element: HTMLElement; // DOM情報
};

type DragAndDropSortRef<T> = {
  keys: Map<T, string>; // 要素に紐づいたkey文字列を管理するMap
  sortedItems: DragAndDropSortItem<T>[]; // 並び替える全ての要素を保持するための配列
  canCheckHovered: boolean; // 重なり判定ができるかのフラグ
  pointerPosition: Position; // マウスポインターの座標
  dragElement: DragAndDropSortItem<T> | null; // ドラッグしてる要素
};

type DragAndDropSortResult<T> = {
  key: string;
  value: T;
  events: {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  };
};

type UseDragAndDropSortArgs<T> = {
  /** 要素の初期値 */
  defaultItems: T[];
  /** true: X方向の移動を無効にする */
  disabledPositionX: boolean;
  /** true: Y方向の移動を無効にする */
  disabledPositionY: boolean;
};

type UseDragAndDropSortReturns<T> = {
  results: DragAndDropSortResult<T>[];
  resetItems: (items: T[]) => void;
};

/**
 * マウスポインターが要素と被っているか判定
 */
const isHover = (
  event: MouseEvent,
  element: HTMLElement,
  disabledPositionX: boolean,
  disabledPositionY: boolean,
): boolean => {
  // マウスポインターの座標を取得
  const clientX = event.clientX;
  const clientY = event.clientY;

  // 重なりを判定する要素のサイズと座標を取得
  const rect = element.getBoundingClientRect();

  // マウスポインターが要素と重なっているかを判定する
  if (disabledPositionX) {
    return clientY < rect.bottom && clientY > rect.top;
  } else if (disabledPositionY) {
    return clientX < rect.right && clientX > rect.left;
  }

  return clientY < rect.bottom && clientY > rect.top && clientX < rect.right && clientX > rect.left;
};

/**
 * ドラッグ＆ドロップで要素を並び替えるhooks
 * respect for: https://zenn.dev/uttk/articles/b90454baec68c8
 */
export const useDragAndDropSort = <T>({
  defaultItems,
  disabledPositionX,
  disabledPositionY,
}: UseDragAndDropSortArgs<T>): UseDragAndDropSortReturns<T> => {
  const [items, setItems] = useState(defaultItems);

  const state = useRef<DragAndDropSortRef<T>>({
    sortedItems: [],
    keys: new Map(),
    dragElement: null,
    canCheckHovered: true,
    pointerPosition: { x: 0, y: 0 },
  }).current;

  /**
   * NOTE: useRefの下に定義しないと値がundefinedになってしまうので注意
   */
  const resultsMemo = useMemo<DragAndDropSortResult<T>[]>(() => {
    if (!state) {
      return [];
    }

    return items.map((value: T): DragAndDropSortResult<T> => {
      // keyが無ければ新しく作り、あれば既存のkey文字列を返す
      const key = state.keys.get(value) || Math.random().toString(16);

      // 生成したkey文字列を保存
      state.keys.set(value, key);

      return {
        value,
        key,
        events: {
          ref: (element: HTMLElement | null): void => {
            if (!element) {
              return;
            }

            const { sortedItems, dragElement, pointerPosition } = state;

            // 位置をリセットする
            element.style.transform = '';

            // 要素の位置を取得
            const { left: x, top: y } = element.getBoundingClientRect();
            const position: Position = { x, y };

            const itemIndex = sortedItems.findIndex((item) => item.key === key);

            // 要素が無ければ新しく追加して処理を終わる
            if (itemIndex === -1) {
              sortedItems.push({ key, value, element, position });

              return;
            }

            if (dragElement?.key === key) {
              // ドラッグ要素のズレを計算する
              const dragX = dragElement.position.x - position.x;
              const dragY = dragElement.position.y - position.y;

              // 入れ替え時のズレを無くす
              element.style.transform = `translate(${dragX}px,${dragY}px)`;

              // マウスポインターの位置も再計算してズレを無くす
              pointerPosition.x -= dragX;
              pointerPosition.y -= dragY;
            }

            // ドラッグ要素以外の要素をアニメーションさせながら移動させる
            if (dragElement?.key !== key) {
              const item = sortedItems[itemIndex];

              // 前回の座標を計算
              const x = disabledPositionX ? 0 : item.position.x - position.x;
              const y = disabledPositionY ? 0 : item.position.y - position.y;

              // 要素を前回の位置に留めておく
              element.style.transition = '';
              element.style.transform = `translate(${x}px,${y}px)`;

              // 一フレーム後に要素をアニメーションさせながら元に位置に戻す
              requestAnimationFrame(() => {
                element.style.transform = '';
                element.style.transition = 'all 300ms';
              });
            }

            // 要素を更新する
            state.sortedItems[itemIndex] = { key, value, element, position };

            return;
          },

          onMouseDown: (event: React.MouseEvent<HTMLElement>): void => {
            // ドラッグする要素(DOM)
            const element = event.currentTarget;

            // マウスポインターの座標を保持しておく
            state.pointerPosition.x = event.clientX;
            state.pointerPosition.y = event.clientY;

            // ドラッグしている要素のスタイルを上書き
            element.style.transition = ''; // アニメーションを無効にする
            element.style.cursor = 'grabbing'; // カーソルのデザインを変更

            // 要素の座標を取得
            const { left: x, top: y } = element.getBoundingClientRect();
            const position: Position = { x, y };

            // ドラッグする要素を保持しておく
            state.dragElement = { key, value, element, position };

            // mousemove, mouseupイベントをwindowに登録する
            // MEMO: 要素外に出たマウスポインターも監視するためwindowに登録する
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
          },
        },
      };
    });
  }, [items, disabledPositionX, disabledPositionY]);

  const resetItems = (items: T[]): void => {
    state.sortedItems = [];
    state.keys = new Map();
    state.dragElement = null;
    state.canCheckHovered = true;
    state.pointerPosition = { x: 0, y: 0 };
    setItems(items);
  };

  // ドラッグ中の処理
  const onMouseMove = (event: MouseEvent): void => {
    const { clientX, clientY } = event;
    const { sortedItems, dragElement, pointerPosition } = state;

    // ドラッグして無ければ何もしない
    if (!dragElement) return;

    // マウスポインターの移動量を計算
    const x = disabledPositionX ? 0 : clientX - pointerPosition.x;
    const y = disabledPositionY ? 0 : clientY - pointerPosition.y;

    const dragStyle = dragElement.element.style;

    // ドラッグ要素の座標とスタイルを更新
    dragStyle.zIndex = '10000';
    dragStyle.cursor = 'grabbing';
    dragStyle.transform = `translate(${x}px,${y}px)`;

    // まだ確認できない場合は処理を終了する
    if (!state.canCheckHovered) return;

    // 確認できないようにする
    state.canCheckHovered = false;

    // 300ms後に確認できるようにする
    setTimeout(() => (state.canCheckHovered = true), 300);

    // ドラッグしている要素の配列の位置を取得
    const dragIndex = sortedItems.findIndex(({ key }) => key === dragElement.key);

    // ホバーされている要素の配列の位置を取得
    const hoveredIndex = sortedItems.findIndex(
      ({ element }, index) => index !== dragIndex && isHover(event, element, disabledPositionX, disabledPositionY),
    );

    if (hoveredIndex !== -1) {
      // カーソルの位置を更新
      state.pointerPosition.x = clientX;
      state.pointerPosition.y = clientY;

      // 要素を入れ替える
      sortedItems.splice(dragIndex, 1);
      sortedItems.splice(hoveredIndex, 0, dragElement);

      const { left: x, top: y } = dragElement.element.getBoundingClientRect();

      // ドラッグ要素の座標を更新
      dragElement.position = { x, y };

      // 再描画する
      setItems(sortedItems.map((v) => v.value));
    }
  };

  // ドラッグが終了した時の処理
  const onMouseUp = (_event: MouseEvent): void => {
    const { dragElement } = state;

    // ドラッグしていなかったら何もしない
    if (!dragElement) return;

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用していたCSSを削除
    dragStyle.zIndex = '';
    dragStyle.cursor = '';
    dragStyle.transform = '';

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  };

  return {
    resetItems,
    results: resultsMemo,
  };
};
