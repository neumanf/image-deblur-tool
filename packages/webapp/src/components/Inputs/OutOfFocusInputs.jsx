import { InputWrapper, NumberInput } from "@mantine/core";

import isValidInput from "../../utils/input-validator";

export function OutOfFocusInputs({ diameter, setDiameter, snr, setSNR }) {
    return (
        <>
            <InputWrapper id="diameter-input" label="Diameter" my="sm">
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
            <InputWrapper
                id="snr-input"
                label="Signal-to-Noise Ratio (SNR)"
                my="sm"
            >
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
