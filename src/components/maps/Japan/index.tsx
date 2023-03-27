import * as d3 from 'd3';
import { useEffect } from 'react';

import type { FC } from 'react';

export const Japan: FC = () => {
  useEffect(() => {
    const width = 800;
    const height = 800;
    const centerPos: [number, number] = [137.0, 38.2]; // the center position on the map
    const scale = 1000; // scale of the map

    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([width / 2, height / 2])
      .scale(scale);

    // 地図をpathに投影(変換)
    const path = d3.geoPath().projection(projection);

    // SVG要素を追加
    const svg = d3
      .select('#japan-map')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // 都道府県の領域データをpathで描画
    d3.json(`${process.env.PUBLIC_URL}/data/japan_map.geojson`).then((data: any) => {
      svg
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('stroke', '#666')
        .attr('stroke-width', 0.25)
        .attr('fill', '#2566CC')
        .attr('cursor', 'pointer')
        .attr('fill-opacity', (_d: any) => {
          // 透明度をランダムに指定する (0.0 - 1.0)
          return Math.random();
        })

        /**
         * 都道府県領域の MouseOver イベントハンドラ
         */
        .on('mouseover', function (_event: any, d: any) {
          const group = svg.append('g').attr('id', 'label-group');

          const label = d.properties.name;

          // 矩形を追加: テキストの枠
          const rectElement = group
            .append('rect')
            .attr('id', 'label-rect')
            .attr('stroke', '#666')
            .attr('stroke-width', 0.5)
            .attr('fill', '#fff');

          // テキストを追加
          const textElement = group.append('text').attr('id', 'label-text').text(label);

          // テキストのサイズから矩形のサイズを調整
          const padding = { x: 5, y: 0 };
          const textSize = (textElement.node() as any).getBBox();

          rectElement
            .attr('x', textSize.x - padding.x)
            .attr('y', textSize.y - padding.y)
            .attr('width', textSize.width + padding.x * 2)
            .attr('height', textSize.height + padding.y * 2);

          // マウス位置の都道府県領域を赤色に変更
          d3.select(this).attr('fill', '#CC4C39');
          d3.select(this).attr('stroke-width', '1');
        })

        /**
         * 都道府県領域の MouseMove イベントハンドラ
         */
        .on('mousemove', function (event: any, _d: any) {
          // テキストのサイズ情報を取得
          const textSize = (svg.select('#label-text').node() as any).getBBox();

          console.log('mousemove', event);

          // マウス位置からラベルの位置を指定
          const labelPosition = {
            x: event.offsetX - textSize.width,
            y: event.offsetY - textSize.height,
          };

          // ラベルの位置を移動
          svg.select('#label-group').attr('transform', `translate(${labelPosition.x} ${labelPosition.y})`);
        })

        /**
         * 都道府県領域の MouseOut イベントハンドラ
         */
        .on('mouseout', function (_event: any, _d: any) {
          // ラベルグループを削除
          svg.select('#label-group').remove();

          // マウス位置の都道府県領域を青色に戻す
          d3.select(this).attr('fill', '#2566CC');
          d3.select(this).attr('stroke-width', '0.25');
        });
    });
  }, []);

  return <div id='japan-map'></div>;
};
