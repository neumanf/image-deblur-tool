import { InputWrapper, NumberInput } from "@mantine/core";

import isValidInput from "../../utils/input-validator";

export function OutOfFocusInputs({ diameter, setDiameter, snr, setSNR }) {
    return (
        <>
            <InputWrapper id="diameter-input" label="D">
                <NumberInput
                    value={diameter}
                    onChange={(d) => setDiameter(d)}
                    type="number"
                    id="diameter-input"
                    placeholder="Radius"
                    error={
                        !isValidInput(diameter) && "D must be a positive number"
                    }
                    required
                />
            </InputWrapper>
            <InputWrapper id="snr-input" label="SNR">
                <NumberInput
                    value={snr}
                    onChange={(snr) => setSNR(snr)}
                    type="number"
                    id="snr-input"
                    placeholder="Signal-to-noise ratio"
                    error={
                        !isValidInput(snr) && "SNR must be a positive number"
                    }
                    required
                />
            </InputWrapper>
        </>
    );
}
