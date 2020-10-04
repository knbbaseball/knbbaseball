import React from 'react';
import format from 'date-fns/format';

export default function TeamPreview({ entry, widgetFor }) {
  const slug = `https://${window.parent.location.host}/team/${entry.getIn(['data', 'slug'])}`;

  return (
    <>
      <input className="my-2 w-100" type="text" disabled="true" name="preview-slug" value={slug} />

      <div className="bg-primary bg-gradient text-white py-4">
        <div className="container">
          <h1 className="h2">{entry.getIn(['data', 'title'])}</h1>
          <p className="mb-0">{entry.getIn(['data', 'description'])}</p>

          <div style={{ margeTop: '1rem' }}>
            <img src={entry.getIn(['data', 'image'])} alt="" />
          </div>
        </div>
      </div>

      <div className="container cms">
        <div className="py-4">{widgetFor('body')}</div>

        <iframe
          src={`${entry.getIn(['data', 'member_table_link'])}&widget=true&headers=false`}
          width="100%"
          className="mn-MemberTable"
        ></iframe>

        <iframe
          src={`${entry.getIn(['data', 'score_table_link'])}&widget=true&headers=false`}
          width="100%"
          className="mn-ScoreTable"
        ></iframe>
      </div>
    </>
  );
}
