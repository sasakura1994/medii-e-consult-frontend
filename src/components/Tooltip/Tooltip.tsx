import React, { CSSProperties, ReactNode } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tooltip: ReturnType<typeof usePopperTooltip>;
};

export const Tooltip = (props: Props) => {
  const { children, className, style = {}, tooltip } = props;
  return (
    <div
      ref={tooltip.setTooltipRef}
      {...tooltip.getTooltipProps({
        className: `tooltip-container ${className ?? ''}`,
        style: {
          borderColor: 'white',
          ['--tooltipBorder' as keyof React.CSSProperties]: 'rgba(0,0,0,0.2)',
          ...style,
        },
      })}
    >
      <div {...tooltip.getArrowProps({ className: 'tooltip-arrow' })} />
      {children}
    </div>
  );
};
