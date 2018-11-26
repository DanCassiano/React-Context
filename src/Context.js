import React, { PureComponent } from "react";

export const Context = React.createContext({});

export const parseContextProps = (context, mapContextProps) => {
  if (mapContextProps && typeof mapContextProps === "function") {
    return {
      context,
      ...mapContextProps(context)
    };
  }

  return {
    context
  };
};

export function mapActionsProps(actions, mapActions) {
  if (mapActions && typeof mapActions === "function") {
    return {
      actions,
      ...mapActions(actions)
    };
  }

  return {
    actions
  };
}

export function withContext(
  Component,
  mapContextProps = null,
  mapActions = null
) {
  class EnhancedComponent extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {context => (
            <Component
              ref={input => {
                this.innerComponent = input;
              }}
              {...parseContextProps(context, mapContextProps)}
              {...mapActionsProps(context.actions, mapActions)}
              {...this.props}
            />
          )}
        </Context.Consumer>
      );
    }
  }

  EnhancedComponent.displayName =
    `Conect(${Component.displayName})` || EnhancedComponent.name;
  EnhancedComponent.navigationOptions = Component.navigationOptions;
  return EnhancedComponent;
}

export default class Provider extends PureComponent {
  static defaultProps = {
    value: {}
  };

  state = this.props.value;

  actions = {};

  _setContext = (key, data) => {
    if (!this.state.hasOwnProperty(key)) {
      console.warn(`the key ${key} is not defined on context`);
      return null;
    }

    this.setState({ [key]: data });
  };

  _getContext = key => {
    if (!key) {
      return this.state;
    }

    return this.state[key];
  };

  parseActions = () => {
    const returnActions = {};
    const { actions } = this.props;
    const actionsKeys = Object.keys(actions);

    actionsKeys.forEach(action => {
      returnActions[action] = (...args) => {
        const func = actions[action](...args);
        return func({
          set: this._setContext,
          get: this._getContext
        });
      };
    });
    return returnActions;
  };

  getContext = () => {
    if (Object.keys(this.props.actions).length > 0) {
      return {
        ...this.state,
        actions: this.parseActions()
      };
    }

    return this.state;
  };

  render() {
    return (
      <Context.Provider value={this.getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
