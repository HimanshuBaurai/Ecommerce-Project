import React from "react";
import "./aboutSection.scss";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.instagram.com/himanshu_baurai?r=nametag";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Developer</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dplesyufl/image/upload/v1687112525/1684906956332_kd8npj.jpg"
                            alt="Founder"
                        />
                        <Typography>HIMANSHU BAURAI</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            "Hello! I'm Himanshu Baurai, a passionate MERN stack developer and a student of Computer Engineering at DTU. With a curious mind and a knack for problem-solving, I find myself constantly exploring the vast world of technology. Whether it's crafting elegant code or unraveling complex algorithms, I thrive on turning ideas into functional and user-friendly applications.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Let's Connect👋</Typography>
                        <a href="https://www.linkedin.com/in/himanshu-baurai-283b4022a" target="blank" >
                            <LinkedInIcon className="linkedinSvgIcon" />
                        </a>

                        <a href="https://www.instagram.com/himanshu_baurai?r=nametag" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;