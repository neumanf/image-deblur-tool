import React, { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Title,
    Popover,
    Button,
    Text,
    Divider,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },
}));

export function AppHeader() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [helpOpened, setHelpOpened] = useState(false);
    const { classes } = useStyles();

    return (
        <Header height={60} mb={120}>
            <Container className={classes.header}>
                <Title order={3}>Image Deblur Tool</Title>
                <Group spacing={5} className={classes.links}>
                    <Popover
                        opened={helpOpened}
                        onClose={() => setHelpOpened(false)}
                        target={
                            <Button
                                variant="outline"
                                onClick={() => setHelpOpened((o) => !o)}
                            >
                                Help
                            </Button>
                        }
                        width={300}
                        position="bottom"
                        withArrow
                    >
                        <Text size="lg" weight="bold">
                            Don't have an image to test?
                        </Text>
                        <Text weight="bold">Out of focus</Text>
                        <Text>
                            <a href="https://i.stack.imgur.com/yrTNI.jpg">
                                Download
                            </a>
                        </Text>
                        <Text>Parameters: D = 28, SNR = 32</Text>
                        <Divider my="xs" />
                        <Text size="lg" weight="bold">
                            How this filter works?
                        </Text>
                        <Text>
                            <a href="https://docs.opencv.org/5.x/de/d3c/tutorial_out_of_focus_deblur_filter.html">
                                Read about it
                            </a>
                        </Text>
                    </Popover>
                </Group>

                <Burger
                    opened={opened}
                    onClick={() => toggleOpened()}
                    className={classes.burger}
                    size="sm"
                />
            </Container>
        </Header>
    );
}
