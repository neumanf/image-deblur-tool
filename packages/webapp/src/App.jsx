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

function App() {
    const [imageSource, setImageSource] = useState(null);
    const [debluriedImage, setDebluriedImage] = useState(null);
    const [radius, setRadius] = useState(0);
    const [snr, setSNR] = useState(0);

    const deblurImage = async () => {
        const formData = new FormData();
        let image = document.querySelector("input[type=file]").files[0];
        formData.append("image", image);

        const res = await fetch("http://127.0.0.1:8000/api/deblur", {
            method: "POST",
            headers: {
                Accept: "*/*",
            },
            body: formData,
        });
        const blob = await res.blob();
        setDebluriedImage(URL.createObjectURL(blob));
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
                                type="number"
                                id="radius-input"
                                placeholder="Radius"
                                required
                            />
                        </InputWrapper>
                        <InputWrapper id="snr-input" label="SNR">
                            <NumberInput
                                value={snr}
                                type="number"
                                id="snr-input"
                                placeholder="Signal-to-noise ratio"
                                required
                            />
                        </InputWrapper>
                        <Button onClick={deblurImage}>Deblur</Button>
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
