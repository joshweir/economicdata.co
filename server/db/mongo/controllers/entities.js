import _ from 'lodash';
//import Topic from '../models/topics';
//temporary import
import namor from 'namor';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({words: 1, numbers: 0}),
    lastName: namor.generate({words: 1, numbers: 0}),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66
      ? 'relationship'
      : statusChance > 0.33
        ? 'complicated'
        : 'single'
  };
};

const getEntityData = (len = 5553) => {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export function availableEntityTypes(req, res) {
  const data = ['contact', 'service request'];
  return res.json(data);
}

/**
 * List
 */
export function all(req, res) {
  /*
  Topic.find({}).exec((err, topics) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(topics);
  });
  */
  const tableData = getEntityData();
  const data = {
    name: 'contact',
    selectedId: 1234,
    tableData
  };
  return res.json(data);
}

export default {
  all,
  availableEntityTypes
};
