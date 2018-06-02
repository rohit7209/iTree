var content = `<div style="border:1px solid grey; border-radius:70px; width:30px; height:30px; overflow:hidden">
<img src="http://via.placeholder.com/300x111" style="width:100%; height:100%">
</div>`;
window.tree1 = {
  name: 'root',
  className: 'root',
  props: { width: '100px', height: '40px', background: 'red' },
  content: content,
  children: [
    {
      name: 'child1',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      content: content,
      children: [
        {
          name: 'child11',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: [
            {
              name: 'child1',
              className: 'children',
              style: { width: '80px', height: '35px', background: 'green' },
              content: content,
              children: [
                {
                  name: 'child11',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: content,
                },
                {
                  name: 'child12',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: content,
                },
              ]
            },
            {
              name: 'child1',
              className: 'children',
              style: { width: '80px', height: '35px', background: 'green' },
              content: content,
              children: [
                {
                  name: 'child11',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: content,
                },
                {
                  name: 'child12',
                  className: 'children',
                  style: { width: '80px', height: '35px', background: 'green' },
                  content: content,
                  children: content,
                },
              ]
            }
          ]
        },
        {
          name: 'child12',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: content,
        },
      ]
    },
    {
      name: 'child2',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      content: content,
      children: [
        {
          name: 'child21',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: content,
        },
        {
          name: 'child22',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: content,
        },
      ]
    },
    {
      name: 'child3',
      className: 'children',
      style: { width: '80px', height: '35px', background: 'green' },
      content: content,
      children: [
        {
          name: 'child31',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: content,
        },
        {
          name: 'child32',
          className: 'children',
          style: { width: '80px', height: '35px', background: 'green' },
          content: content,
          children: content,
        },
      ]
    },
  ],
};