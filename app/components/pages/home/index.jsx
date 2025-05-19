import pageMetadataConstant from "../../../constants/metadata/page.jsx";

export function meta() {
  return [
    {title: pageMetadataConstant.home.title},
    {name: 'description', content: pageMetadataConstant.home.description}
  ]
}

export default function HomePage() {
  return <>
    Thinh dt
  </>
}
