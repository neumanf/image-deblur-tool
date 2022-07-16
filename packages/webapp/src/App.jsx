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
import {
    showNotification,
    NotificationsProvider,
} from "@mantine/notifications";
import { useState } from "react";

import { AppHeader } from "./components/Header";
import { OutOfFocusInputs, MotionInputs } from "./components/Inputs";
import isValidInput from "./utils/input-validator";

function App() {
    const [isLoading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [imageSource, setImageSource] = useState(null);
    const [debluriedImage, setDebluriedImage] = useState(null);
    const [diameter, setDiameter] = useState(0);
    const [snr, setSNR] = useState(0);
    const [angle, setAngle] = useState(0);

    const deblurImage = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            let image = document.querySelector("input[type=file]").files[0];
            formData.append("image", image);

            const apiUrl = import.meta.env.VITE_API_URL;
            const url = new URL(`${apiUrl}/api/deblur`);
            url.searchParams.set("d", diameter);
            url.searchParams.set("snr", snr);
            if (activeTab === 1) url.searchParams.set("angle", angle);

            const res = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    Accept: "*/*",
                },
                body: formData,
            });
            const blob = await res.blob();
            setDebluriedImage(URL.createObjectURL(blob));
        } catch (error) {
            showNotification({
                title: "Error",
                message:
                    "An unexpected error occurred while processing the request, please try again later.",
                color: "red",
            });
        }

        setLoading(false);
    };

    return (
        <NotificationsProvider>
            <AppHeader />
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
                                    diameter={diameter}
                                    setDiameter={setDiameter}
                                    snr={snr}
                                    setSNR={setSNR}
                                />
                            </Tabs.Tab>
                            <Tabs.Tab label="Motion">
                                <MotionInputs
                                    diameter={diameter}
                                    setDiameter={setDiameter}
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
                                !isValidInput(diameter) ||
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
        </NotificationsProvider>
    );
}

export default App;
