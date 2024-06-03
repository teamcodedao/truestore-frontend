interface SignatureProps {
  domain: string;
}

export default function Signature({domain}: SignatureProps) {
  return (
    <>
      <p>
        Email: <a href={`mailto:${`help@${domain}`}`}>{`help@${domain}`}</a>
      </p>
      <h4>CuTeng Queue Pte. Ltd</h4>
      <address>
        Address: 244 Fast North Drive 1, #02-05, Singapore, 528559
      </address>
    </>
  );
}
