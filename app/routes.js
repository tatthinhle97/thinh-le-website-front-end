import {index, route} from "@react-router/dev/routes";

const pagePrefix = 'components/pages'

export default [
  index(`${pagePrefix}/home/index.jsx`),
  route('about-me', `${pagePrefix}/about-me/index.jsx`),
  route('projects', `${pagePrefix}/projects/index.jsx`),
  route(
      'projects/sale-and-rental-listings',
      `${pagePrefix}/projects/sale-and-rental-listings/index.jsx`
  )
];
