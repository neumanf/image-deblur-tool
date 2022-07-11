import { InputWrapper, NumberInput } from "@mantine/core";

import isValidInput from "../../utils/input-validator";
import { OutOfFocusInputs } from "./OutOfFocusInputs";

export function MotionInputs({
    radius,
    setRadius,
    snr,
    setSNR,
    angle,
    setAngle,
}) {
    return (
        <>
            <OutOfFocusInputs
                radius={radius}
                setRadius={setRadius}
                snr={snr}
                setSNR={setSNR}
            />
            <InputWrapper id="angle-input" label="Angle">
                <NumberInput
                    value={angle}
                    onChange={(a) => setAngle(a)}
                    type="number"
                    id="radius-input"
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
