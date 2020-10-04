import React from 'react';
import format from 'date-fns/format';

const formatDate = (dataStr) =>
  new Date(dataStr).toLocaleDateString('ja', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

// A CMS template for the home layout.
export default function HomePreview({ entry, getAsset, widgetFor }) {
  const image = getAsset(entry.getIn(['data', 'image']));
  const gmText = entry.getIn(['data', 'blurb', 'gm_name']);

  return (
    <>
      <section className="bg-primary text-white pb-4">
        <div className="container p-0">
          <marquee className="h4 mt-1 mb-0 primary">{entry.getIn(['data', 'banner'])}</marquee>
          <img src={image} />
        </div>

        <div className="container">
          <h2 className="my-3 font-weight-bold">{entry.getIn(['data', 'blurb', 'heading'])}</h2>
          <p className="lead text-light">{entry.getIn(['data', 'blurb', 'text'])}</p>

          <figure className="figure">
            <img
              src={entry.getIn(['data', 'blurb', 'gm_image'])}
              alt={gmText}
              className="img-thumbnail figure-img"
            />
            <figcaption className="figure-caption text-white text-center">{gmText}</figcaption>
          </figure>
        </div>
      </section>

      <section className="container py-4">
        <div className="overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th>チーム</th>
                <th>日　付</th>
                <th>時　間</th>
                <th>内　容</th>
                <th>場　所</th>
              </tr>
            </thead>
            <tbody>
              {(entry.getIn(['data', 'schedule']) || []).map((scheduleEntry, i) => (
                <tr key={i}>
                  <td>{scheduleEntry.get('team')}</td>
                  <td>{formatDate(scheduleEntry.get('date'))}</td>
                  <td>{scheduleEntry.get('time')}</td>
                  <td>{scheduleEntry.get('description')}</td>
                  <td>{scheduleEntry.get('location_text')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container py-0 mb-4">
        <div className="alert alert-info">
          <h2 className="h1">{entry.getIn(['data', 'info', 'heading'])}</h2>
          <p className="lead mr-lg-3">{entry.getIn(['data', 'info', 'text'])}</p>

          <img
            src={entry.getIn(['data', 'info', 'image'])}
            alt={entry.getIn(['data', 'info', 'heading'])}
            className="img-fluid mb-3"
          />

          <a
            href={entry.getIn(['data', 'info', 'link_url'])}
            class="btn btn-primary mn-raise d-inline-block"
          >
            {entry.getIn(['data', 'info', 'link_text'])}
          </a>
        </div>
      </section>

      <div className="container py-2">{widgetFor('body')}</div>
    </>
  );
}
