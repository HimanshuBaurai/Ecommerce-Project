import React from 'react'
import playStore from '../../../images/google-play-png-logo.png'
import appStore from '../../../images/app-store-png-logo-33112.png'
import './Footer.scss';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android And IOS mobile phone</p>
                <img src={playStore} alt='playStore' />
                <img src={appStore} alt='appStore' />
            </div>
            <div className='midFooter'>
                <h1>Ecommerce</h1>
                <p>Quality Top-Notch</p>
                <p>Copyrights 2023 &copy; Himanshu Baurai</p>
            </div>
            <div className='rightFooter'>
                <h4>Follow us on</h4>
                <a href='#'>Instagram</a>
                <a href='#'>Facebook</a>
                <a href='#'>Twitter</a>
            </div>
        </footer>
    )
}

export default Footer


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';

// const useStyles = makeStyles((theme) => ({
//     rootBox: {
//         [theme.breakpoints.down('md')]: {
//             justifyContent: 'center'
//         }
//     },
//     footerNav: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         marginRight: 'auto',
//         marginLeft: theme.spacing(3),
//         marginBottom: theme.spacing(0),

//         [theme.breakpoints.down('md')]: {
//             width: '100%',
//             marginLeft: 'auto',
//             marginTop: theme.spacing(3),
//             marginBottom: theme.spacing(2),
//         }
//     },
//     footerLink: {
//         marginLeft: theme.spacing(3),
//         marginRight: theme.spacing(3),
//         [theme.breakpoints.down('md')]: {
//             marginBottom: theme.spacing(2),
//         }
//     },
// }));

// export default function Footer() {
//     const classes = useStyles();

//     const content = {
//         'brand': { image: './', width: 110 },
//         'copy': '© 2020 Nereus All rights reserved.',
//         'link1': 'First Link',
//         'link2': 'Second Link',
//         'link3': 'Third Link',
//         'link4': 'Fourth Link',
//         // ...props.content
//     };

//     let brand;

//     if (content.brand.image) {
//         // brand = <img src={content.brand.image} alt="" width={content.brand.width} />;
//         brand = <img src='../../images/logo.svg' alt="" width={content.brand.width} />;
//     } else {
//         brand = content.brand.text || '';
//     }

//     return (
//         <footer>
//             <Container maxWidth="lg">
//                 <Box py={6} display="flex" flexWrap="wrap" alignItems="center" className={classes.rootBox}>
//                     <Link href="#" color="inherit" underline="none">
//                         {brand}
//                     </Link>
//                     <Box component="nav" className={classes.footerNav}>
//                         <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link1']}</Link>
//                         <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link2']}</Link>
//                         <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link3']}</Link>
//                         <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>{content['link4']}</Link>
//                     </Box>
//                     <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>{content['copy']}</Typography>
//                 </Box>
//             </Container>
//         </footer>
//     );
// } 