import React from 'react';
import format from 'date-fns/format';

export default function TeamPreview({ entry, widgetFor }) {
  return (
    <div className="container">
      <h1 className="mn-PageTitle">{entry.getIn(['data', 'title'])}</h1>

      <p className="mb-0">{entry.getIn(['data', 'description'])}</p>

      <div className="cms">
        {widgetFor('body')}

        <div className="py-4">
          <iframe
            src={`${entry.getIn(['data', 'annual_plan_table_link'])}&widget=true&headers=false`}
            width="100%"
            className="mn-AnnualPlanTable"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
