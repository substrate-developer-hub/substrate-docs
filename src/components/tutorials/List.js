import React from 'react';

import TutorialCard from './Card';

const TutorialList = ({ models }) => {
  return (
    <section>
      {models ? (
        <ul className="p-0 m-0 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-4">
          {models.map((model, index) => (
            <li key={index} className="list-none">
              <TutorialCard model={model.node} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No tutorials yet</p>
      )}
    </section>
  );
};

export default TutorialList;
