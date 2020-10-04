import React from 'react';
import format from 'date-fns/format';

export default function SimplePreview({ entry, widgetFor }) {
  return (
    <div className="container">
      <h1 className="mn-PageTitle">{entry.getIn(['data', 'title'])}</h1>

      <p className="mb-0">{entry.getIn(['data', 'description'])}</p>

      <div className="cms">
        {widgetFor('body')}
      </div>
    </div>
  );
}
