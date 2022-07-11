import { InputWrapper, NumberInput } from "@mantine/core";

import isValidInput from "../../utils/input-validator";

export function OutOfFocusInputs({ radius, setRadius, snr, setSNR }) {
    return (
        <>
            <InputWrapper id="radius-input" label="R">
                <NumberInput
                    value={radius}
                    onChange={(r) => setRadius(r)}
                    type="number"
                    id="radius-input"
                    placeholder="Radius"
                    error={
                        !isValidInput(radius) && "R must be a positive number"
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
