export default function Location({src }) {
    return (
        <iframe
            src={src}
            width="600"
            height="450"
            style={{ border: 0, width: "100%" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    );
}
