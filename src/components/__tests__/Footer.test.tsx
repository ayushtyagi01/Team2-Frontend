import { render,screen } from "@testing-library/react";
import Footer from "../Footer/Footer";

test('render Footer Text',()  => {
    render(<Footer/>);
    const FooterText = screen.getByText('© Kickdrum Technology Group LLC.');
    expect(FooterText).toBeInTheDocument();
})
test('render Footer Text-2',()  => {
    render(<Footer/>);
    const FooterText = screen.getByText('All rights reserved');
    expect(FooterText).toBeInTheDocument();
})