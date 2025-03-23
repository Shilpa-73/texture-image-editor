import * as React from "react";
import Image from 'next/image'

const TemplateImage = ({image=null}) => (
	<div className="Container">
		<Image
            className="image-container-bg-image"
            src={image || "/image/BlossomBeauty.webp"}
            alt="Landscape photograph by Tobias Tullius"
            />
	</div>
);

export default TemplateImage;
