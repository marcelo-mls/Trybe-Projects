import React from 'react';
import PropTypes from 'prop-types';

class SubHeader extends React.Component {
  render() {
    const { subHeader } = this.props;

    return (
      <div className="divSubHeader">
        <h2>{ subHeader }</h2>
      </div>
    );
  }
}

SubHeader.propTypes = {
  subHeader: PropTypes.string,
}.isRequired;

export default SubHeader;
