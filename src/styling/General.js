import Themes from './Themes'

const selected = "main"
const {backgroundColor, primaryColor, color1, color2, fontFamily} = Themes[selected]

/*
	system for common styles

	name	flexDirection	alignItems	justifyContent
	--		--				--			--
	
	r		row				
	rc		row				center
	rcc		row				center		center
	rcs		row				center		space-between

	cc		column			center
	ccc		column			center		center
	ccs		column			center		space-between
*/

export default {

    // exported theme properties
    backgroundColor, 
    primaryColor, 
    color1, 
    color2, 
    fontFamily,
    //

    // common flexbox styles
	r: {
		flexDirection: "row"
	},
	rc: {
		flexDirection: "row",
		alignItems: "center"
	},
	rcc: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	rcs: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	cc: {
		flexDirection: "column",
		alignItems: "center"
	},
	ccc: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	ccs: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between"
	},
    //

    // text styling
    text1: {
        fontFamily,
        color: color1
    },
    text2: {
        fontFamily,
        color: color2
    },
    textL: {
        fontSize: 20
    },
    textS: {
        fontSize: 16
    },
    //

    // common padding values
    p16: {
        padding: 16
    },
    ph16: {
        paddingHorizontal: 16
    },
    pv8: {
        paddingVertical: 8
    },
    pt8: {
        paddingTop: 8
    },
    pr8: {
        paddingRight: 8
    },
    pl8: {
        paddingLeft: 8
    },
    pb8: {
        paddingBottom: 8
    },
    //

    // other styles
    holder: {
		flex: 1,
		backgroundColor: backgroundColor
	},
    styledBorderH: {
        marginTop: 8, width: 30, borderBottomColor: primaryColor, borderBottomWidth: 2
    },
    styledBorderV: {
        marginVertical: 4, marginLeft: 8, borderLeftColor: primaryColor, borderLeftWidth: 2
    },
    img: {
        width: 36, height: 36
    },
    imgS: {
        width: 16, height: 16
    }

}


