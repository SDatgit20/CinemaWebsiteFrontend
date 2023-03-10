import React from "react";
import { shallow } from "enzyme";
import Profile from "./Profile"
import ChangePasswordDialog from "./ChangePasswordDialog"
import { Button } from "@material-ui/core";
import { render, fireEvent } from "@testing-library/react";

describe("Basic rendering", () => {

    it("Should not render the logout section if authenticated", () => {
        const profileComponent = shallow(<Profile isAuthonticated={false} />);
        const changePasswordDialogComponent = profileComponent.find(<ChangePasswordDialog open={true}
            onClose={false}
            isAuthenticated={true} />);
        const buttonComponent = profileComponent.find(Button)
        const missingLogoutDivComponent = profileComponent.find("div");
        expect(missingLogoutDivComponent.length).toBe(2)
        expect(buttonComponent.text()).toBe("CHANGE PASSWORD");

    })

})