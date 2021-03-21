import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';

export default function GenderSelect() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" style={{textAlign:'start'}}>Пол</FormLabel>
            <RadioGroup aria-label="gender" name="gender1"
                value={value}
                onChange={handleChange}
                row>
                <FormControlLabel value="Female"
                    control={
                        <Radio
                    color="default"/>
                    }
                    labelPlacement="start"
                    label="Жена"/>
                <FormControlLabel value="Male"
                    control={
                        <Radio
                    color="default"/>
                    }
                    labelPlacement="start"
                    label="Мъж"/>
                <FormControlLabel value="Other"
                    control={
                        <Radio
                    color="default"/>
                    }
                    labelPlacement="start"
                    label="По избор"/>
            </RadioGroup>
        </FormControl>
    )
}
