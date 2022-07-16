import { InputWrapper, NumberInput } from "@mantine/core";

import isValidInput from "../../utils/input-validator";
import { OutOfFocusInputs } from "./OutOfFocusInputs";

export function MotionInputs({
    diameter,
    setDiameter,
    snr,
    setSNR,
    angle,
    setAngle,
}) {
    return (
        <>
            <OutOfFocusInputs
                diameter={diameter}
                setDiameter={setDiameter}
                snr={snr}
                setSNR={setSNR}
            />
            <InputWrapper id="angle-input" label="Angle">
                <NumberInput
                    value={angle}
                    onChange={(a) => setAngle(a)}
                    type="number"
                    id="diameter-input"
                    placeholder="Angle"
                    error={
                        !isValidInput(angle) &&
                        "Angle must be a positive number"
                    }
                    required
                />
            </InputWrapper>
        </>
    );
}
