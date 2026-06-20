import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function DashboardCard({ title, value, icon }) {

    return (

        <Card
            sx={{
                borderRadius: 5,

                background: "rgba(255,255,255,0.75)",

                backdropFilter: "blur(15px)",

                border: "1px solid rgba(255,255,255,.4)",

                boxShadow:
                    "0 15px 35px rgba(25,118,210,.15)",

                transition: ".35s",

                "&:hover": {

                    transform: "translateY(-8px)",

                    boxShadow:
                        "0 25px 45px rgba(25,118,210,.25)"
                }
            }}
        >

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                >

                    <Box>

                        <Typography
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight="bold"
                        >
                            {value}
                        </Typography>

                        <Box
                            display="flex"
                            mt={2}
                            alignItems="center"
                        >

                            <TrendingUpIcon
                                color="success"
                                fontSize="small"
                            />

                            <Typography
                                sx={{
                                    ml: 1
                                }}
                                color="success.main"
                            >
                                Live
                            </Typography>

                        </Box>

                    </Box>

                    <Box
                        sx={{
                            fontSize: 60,
                            color: "primary.main"
                        }}
                    >
                        {icon}
                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}

export default DashboardCard;