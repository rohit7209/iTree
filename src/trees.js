export const tree1 = {
  name: 'root',
  className: 'root',
  props: { width: '100px', height: '40px', background: 'red' },
  children: [
    {
      name: 'child1',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      children: [
        {
          name: 'child11',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          children: `
          <div>
            <img src="http://via.placeholder.com/300x111" style="width:50px; height:35px">
            <label>This is label</label>
          </div>
          `,
        },
        {
          name: 'child12',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          children: `
          <div>
            <img src="http://via.placeholder.com/300x112" style="width:50px; height:35px">
            <label>This is label</label>
          </div>
          `,
        },
      ]
    },
    {
      name: 'child2',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      children: [
        {
          name: 'child21',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          children: `
          <div>
            <img src="http://via.placeholder.com/300x200" style="width:50px; height:35px">
            <label>This is label</label>
          </div>
          `,
        },
        {
          name: 'child22',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          children: `
          <div>
            <img src="http://via.placeholder.com/300x200" style="width:50px; height:35px">
            <label>This is label</label>
          </div>
          `,
        },
      ]
    },
  ],
};