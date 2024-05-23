import React from "react";

type Props = {
    image?: string,
}

const SquaredImage = React.memo((props: Props) => {
    const { image } = props;

    if (image) {
        return <img
            className="squared-image"
            src={image} />
    } else {
        return <div className="squared-image"></div>
    }
})

export default SquaredImage;