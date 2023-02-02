import React from 'react';
import 'react-popper-tooltip/dist/styles.css';
import styles from './Tooltip.module.scss';
import { usePopperTooltip } from 'react-popper-tooltip';
import type { TriggerType } from 'react-popper-tooltip';

type StyleType = {
  arrow?: string;
  body?: string;
};

type PropsType = {
  children: React.ReactElement[];
  triggerAction?: TriggerType;
  offset?: [number, number];
  delayHide?: number;
  showArrow?: boolean;
  style?: StyleType;
};

const getArrowStyle = (style: StyleType | undefined): string => {
  if (!style) return styles.tooltip_arrow;
  if (style.arrow && styles.tooltip_arrow)
    return `${styles.tooltip_arrow} ${style.arrow}`;
  if (style.arrow) return style.arrow;
  return styles.tooltip_arrow;
};

const getBodyStyle = (style: StyleType | undefined): string => {
  if (!style) return styles.tooltip;
  if (style.body && styles.tooltip) return `${styles.tooltip} ${style.body}`;
  if (style.body) return style.body;
  return styles.tooltip;
};

export const Tooltip: React.FC<PropsType> = (props) => {
  const { children, triggerAction, offset, delayHide, showArrow, style } =
    props;

  const [controlledVisible, setControlledVisible] = React.useState(false);
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: triggerAction,
    offset,
    interactive: true,
    delayHide: delayHide || 0,
    closeOnTriggerHidden: false,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
  });

  const additionalProps = {
    menus: children[1].props.menus,
    style: children[1].props.style,
    setControlledVisible,
  };
  const trigger = children[0];
  const body = React.cloneElement(children[1], additionalProps);

  return (
    <>
      <div ref={setTriggerRef}>{trigger}</div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: getBodyStyle(style) })}
        >
          {showArrow && (
            <div {...getArrowProps({ className: getArrowStyle(style) })} />
          )}
          {body}
        </div>
      )}
    </>
  );
};
