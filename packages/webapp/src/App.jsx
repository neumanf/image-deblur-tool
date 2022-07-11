import {
    Button,
    Container,
    Group,
    Image,
    Input,
    Stack,
    Title,
    Text,
    Tabs,
} from "@mantine/core";
import { useState } from "react";

import { AppHeader } from "./components/Header";
import { OutOfFocusInputs, MotionInputs } from "./components/Inputs";
import isValidInput from "./utils/input-validator";

const navbarLinks = [
    {
        link: "#about",
        label: "About",
    },
];

function App() {
    const [isLoading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [imageSource, setImageSource] = useState(null);
    const [debluriedImage, setDebluriedImage] = useState(null);
    const [radius, setRadius] = useState(0);
    const [snr, setSNR] = useState(0);
    const [angle, setAngle] = useState(0);

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
                        <Tabs active={activeTab} onTabChange={setActiveTab}>
                            <Tabs.Tab label="Out of focus">
                                <OutOfFocusInputs
                                    radius={radius}
                                    setRadius={setRadius}
                                    snr={snr}
                                    setSNR={setSNR}
                                />
                            </Tabs.Tab>
                            <Tabs.Tab label="Motion">
                                <MotionInputs
                                    radius={radius}
                                    setRadius={setRadius}
                                    snr={snr}
                                    setSNR={setSNR}
                                    angle={angle}
                                    setAngle={setAngle}
                                />
                            </Tabs.Tab>
                        </Tabs>
                        <Button
                            onClick={deblurImage}
                            disabled={
                                imageSource === null ||
                                !isValidInput(radius) ||
                                !isValidInput(snr) ||
                                (activeTab === 1 && !isValidInput(angle))
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
