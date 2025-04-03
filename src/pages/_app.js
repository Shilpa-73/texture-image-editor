import "@/styles/globals.css";
// import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend'

export const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: {enableMouseEvents: true},
      preview: true,
      transition: TouchTransition,
    },
  ],
}

export default function App({ Component, pageProps }) {
  return (<>
        {/* <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}> */}
        <DndProvider options={HTML5toTouch}>
        <Component {...pageProps} />
        </DndProvider>
    </>);
}
