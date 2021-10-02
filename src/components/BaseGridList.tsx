import React from "react";
import { VariableSizeList } from "react-window";

function BaseGridList(
  itemCount: any,
  onItemsRendered: any,
  ref: any,
  innerListRef: React.MutableRefObject<any>,
  RenderRow: ({ index, style }: { index: any; style: any }) => JSX.Element
): any {
  return (
    <VariableSizeList
      className="List"
      height={document.documentElement.clientHeight}
      itemCount={itemCount}
      itemSize={() => 350}
      minimumBatchSize={20}
      onItemsRendered={onItemsRendered}
      ref={ref}
      innerRef={innerListRef}
    >
      {RenderRow}
    </VariableSizeList>
  );
}

export { BaseGridList };
