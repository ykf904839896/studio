import * as React from 'react';
import { useEffect, useRef, useContext } from 'react';
import IDraw from 'idraw';
// import { TypeData, TypeScreenPosition } from '@idraw/types';
import { Layout } from '../../../ui/antd'; 
import eventHub from '../../util/event-hub';
// import ScrollBox from './scroll-box';
import { StudioContext } from './../../context';

const { Content } = Layout;

type TypeProps = {
  height: number;
  width: number;
  contextWidth: number;
  contextHeight: number;
}

function StudioContent(props: TypeProps) {
  const context = useContext(StudioContext);
  const { data } = context;
  const { width, height } = props;
  const mount = useRef(null); 
  
  useEffect(() => {
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new IDraw(mountDiv, {
      width: width,
      height: height,
      contextWidth: props.contextWidth,
      contextHeight: props.contextHeight,
      devicePixelRatio: 4,
    }, {
      scrollWrapper: {
        use: true,
        color: '#bbbbbb',
        lineWidth: 10,
      }
    });
    // setIDraw(idraw);

    idraw.on('changeData', (data) => {
      eventHub.trigger('studioChangeData', data);
    });

    idraw.on('screenSelectElement', (elem) => {
      idraw.selectElementByUUID(elem.uuid, {
        useMode: true,
      });
      eventHub.trigger('studioSelectElement', {
        uuid: elem.uuid,
        useMode: true,
      })
    });
    
    // studio event
    eventHub.on('studioScaleScreen', (num) => {
      idraw.scale(num);
      idraw.draw();
    });
    eventHub.on('studioSelectElement', (data) => {
      idraw.selectElementByUUID(data.uuid, { useMode: data.useMode });
    });
    eventHub.on('studioUpdateElement', (elem) => {
      idraw.updateElement(elem);
    })

    if (data) {
      idraw.initData(data);
    }
    idraw.scale(1);
    idraw.draw();
  }, []);

  return (
    <Content className="idraw-studio-content">
      <div style={{
          width: props.width,
          height: props.height,
        }} ref={mount}></div>
    </Content>
  )
}


export default StudioContent