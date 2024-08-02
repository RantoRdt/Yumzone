import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { defaults } from 'ol/interaction'
import { useGeographic } from 'ol/proj';
import { getPlaceName } from '../../API/axios';
import { OutlinedInput, InputAdornment, Icon, Stack } from '@mui/material';
import { PlaceOutlined } from "@mui/icons-material";

const Map = ({ invisible=false, onChange, value }) => {
    const mapElement = useRef(null)

    useGeographic()
    useEffect(() => {
        const map = new OLMap({
            target: mapElement.current,
            layers: [ new TileLayer({ source: new OSM()})],
            view: new View({ center: [47.5250, -18.9025 ], zoom: 14 }),
            interactions: defaults({ mouseWheelZoom: false })
        })
        
        map.on('click', async event => {
            const coordinate = event.coordinate

            try {
                const { data: { display_name } } = await getPlaceName(coordinate)
                onChange(display_name)
            } catch (error) { console.error(error) }
        })

        return () => { map.dispose() }
    }, [])

    return <Stack spacing={2}>
        <div ref={mapElement} style={{ width: '100%', height: '400px', cursor: "pointer", display: invisible ? "none" : "block" }} />
        <OutlinedInput type="text" name="place" readOnly value={value}
            startAdornment={<InputAdornment position="start"><Icon><PlaceOutlined/></Icon></InputAdornment>}/>        
    </Stack>
}

export default Map