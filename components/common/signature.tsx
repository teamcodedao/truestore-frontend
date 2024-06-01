import {headers} from 'next/headers';

export default function Signature() {
  const host = headers().get('host');

  return (
    <>
      <p>
        Email: <a href={`mailto:${`help@${host}`}`}>{`help@${host}`}</a>
      </p>
      <h4>CuTeng Queue Pte. Ltd</h4>
      <address>
        Address: 244 Fast North Drive 1, #02-05, Singapore, 528559
      </address>
    </>
  );
}
