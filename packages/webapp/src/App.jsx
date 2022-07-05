import {
    Button,
    Container,
    Group,
    Image,
    Input,
    Stack,
    Title,
    Text,
    InputWrapper,
    NumberInput,
} from "@mantine/core";
import { useState } from "react";

import { AppHeader } from "../components/Header";

const navbarLinks = [
    {
        link: "#about",
        label: "About",
    },
];

const isValidInput = (value) => {
    if (isNaN(value) || value < 0 || value > 9999999) {
        return false;
    }
    return true;
};

function App() {
    const [isLoading, setLoading] = useState(false);
    const [imageSource, setImageSource] = useState(null);
    const [debluriedImage, setDebluriedImage] = useState(null);
    const [radius, setRadius] = useState(0);
    const [snr, setSNR] = useState(0);

    const deblurImage = async () => {
        setLoading(true);
        const formData = new FormData();
        let image = document.querySelector("input[type=file]").files[0];
        formData.append("image", image);

        const res = await fetch(
            `http://127.0.0.1:8000/api/deblur?r=${radius}&snr=${snr}`,
            {
                method: "POST",
                headers: {
                    Accept: "*/*",
                },
                body: formData,
            }
        );
        const blob = await res.blob();
        setDebluriedImage(URL.createObjectURL(blob));
        setLoading(false);
    };

    return (
        <>
            <AppHeader links={navbarLinks} />
            <Container>
                <Group position="apart" grow>
                    <Stack>
                        <Input
                            variant="filled"
                            type="file"
                            onChange={(e) => setImageSource(e.target.files[0])}
                        />
                        <Image
                            width="100%"
                            height={300}
                            src={
                                imageSource && URL.createObjectURL(imageSource)
                            }
                            placeholder={
                                <Text align="center">
                                    Select an image to deblur.
                                </Text>
                            }
                            withPlaceholder={imageSource === null}
                        ></Image>
                        <InputWrapper id="radius-input" label="R">
                            <NumberInput
                                value={radius}
                                onChange={(r) => setRadius(r)}
                                type="number"
                                id="radius-input"
                                placeholder="Radius"
                                error={
                                    !isValidInput(radius) &&
                                    "R must be a positive number"
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
                                    !isValidInput(snr) &&
                                    "SNR must be a positive number"
                                }
                                required
                            />
                        </InputWrapper>
                        <Button
                            onClick={deblurImage}
                            disabled={
                                imageSource === null ||
                                !isValidInput(radius) ||
                                !isValidInput(snr)
                            }
                            loading={isLoading}
                        >
                            Deblur
                        </Button>
                    </Stack>
                    <Stack>
                        <Title order={4}>Result</Title>
                        <Image
                            height={300}
                            width="100%"
                            src={debluriedImage}
                            withPlaceholder={debluriedImage === null}
                        ></Image>
                    </Stack>
                </Group>
            </Container>
        </>
    );
}

export default App;
