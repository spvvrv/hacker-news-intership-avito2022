import {
AppBar,
Container,
Toolbar,
Typography,
} from "@mui/material";

function Header() {
return (
<AppBar position="static">
    <Container fixed>
    <Toolbar>
        <Typography

        variant="h4"
        align="center"
        // sx={{ flexGrow: 2 }}
        >
        Hacker News
        </Typography>

    </Toolbar>
    </Container>
</AppBar>
);
}

export default Header;
