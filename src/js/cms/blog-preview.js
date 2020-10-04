import React from 'react';
import format from 'date-fns/format';

export default function BlogPreview({ entry, widgetFor }) {
  const dateForDisplay = format(entry.getIn(['data', 'date']), 'YYYY/MM/DD');

  return (
    <>
      <div class="bg-primary bg-gradient text-white py-4">
        <div className="container">
          <p className="text-light mb-1">{dateForDisplay}</p>
          <h1 className="h2">{entry.getIn(['data', 'title'])}</h1>
          <p className="mb-0">{entry.getIn(['data', 'description'])}</p>

          <div style={{ margeTop: '1rem' }}>
            <img src={entry.getIn(['data', 'image'])} alt="" />
          </div>
        </div>
      </div>

      <div class="container cms py-4">{widgetFor('body')}</div>
    </>
  );
}
