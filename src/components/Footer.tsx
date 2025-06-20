const Footer = () => {
  return (
    <div className="bottom-0 py-10 bg-amber-600 w-full grid grid-cols-4 gap-12 justify-items-center">
      <div className="">
        <h2 className="subheading">Hours</h2>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <ul>
            <li>Monday</li>
            <li>Tuesday</li>
            <li>Wednesday</li>
            <li>Thursday</li>
            <li>Friday</li>
            <li>Saturday</li>
            <li>Sunday</li>
          </ul>
          <ul>
            <li>9:00am - 11:00pm</li>
            <li>9:00am - 11:00pm</li>
            <li>9:00am - 11:00pm</li>
            <li>9:00am - 11:00pm</li>
            <li>9:00am - 11:00pm</li>
            <li>9:00am - 11:00pm</li>
            <li>9:00am - 11:00pm</li>
          </ul>
        </div>
      </div>
      <div className="subheading">Shop</div>
      <div className="subheading">Info</div>
      <div className="subheading">Contact Us</div>
    </div>
  );
};

export default Footer;
