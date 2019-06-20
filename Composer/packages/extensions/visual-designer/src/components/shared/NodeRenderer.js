import React from 'react';
import classnames from 'classnames';

import { ObiTypes } from '../../shared/ObiTypes';
import {
  DefaultRenderer,
  IntentRule,
  Recognizer,
  BeginDialog,
  UnknownIntentRule,
  EventRule,
  IfCondition,
  SwitchCondition,
} from '../nodes/index';

import { NodeProps, defaultNodeProps } from './sharedProps';
import './NodeRenderer.css';

const rendererByObiType = {
  [ObiTypes.IntentRule]: IntentRule,
  [ObiTypes.UnknownIntentRule]: UnknownIntentRule,
  [ObiTypes.RegexRecognizer]: Recognizer,
  [ObiTypes.LuisRecognizer]: Recognizer,
  [ObiTypes.BeginDialog]: BeginDialog,
  [ObiTypes.EventRule]: EventRule,
  [ObiTypes.IfCondition]: IfCondition,
  [ObiTypes.SwitchCondition]: SwitchCondition,
  [ObiTypes.ConditionNode]: DefaultRenderer,
};
const DEFAULT_RENDERER = DefaultRenderer;

function chooseRendererByType($type) {
  const renderer = rendererByObiType[$type] || DEFAULT_RENDERER;
  return renderer;
}

export class NodeRenderer extends React.Component {
  containerRef = React.createRef();

  render() {
    const { id, data, focusedId, onEvent, onResize } = this.props;
    const ChosenRenderer = chooseRendererByType(data.$type);
    return (
      <div className={classnames('node-renderer-container', { 'node-renderer-container--focused': focusedId === id })}>
        <ChosenRenderer
          id={id}
          data={data}
          focusedId={focusedId}
          onEvent={onEvent}
          onResize={size => {
            onResize(size, 'node');
          }}
        />
      </div>
    );
  }
}

NodeRenderer.propTypes = NodeProps;
NodeRenderer.defaultProps = defaultNodeProps;
