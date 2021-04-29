import { Job, JobMenuEnum } from "../../types";
import React, { ReactElement } from "react";
import { BookMarkIcon, FlagIcon } from "../icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon, NotAllowedIcon } from "@chakra-ui/icons";

type JobMenuProps = {
    onClick( menu: JobMenuEnum ): void
    jobId: Job["id"]
    hasBeenSaved: boolean
}

function getJobMenu( hasBeenSaved: boolean ): { value: JobMenuEnum, label: string, icon: ReactElement }[] {
    return [
        { value: JobMenuEnum.SAVE, label: hasBeenSaved ? "Remove saved job" : "Save job", icon: <BookMarkIcon/> },
        { value: JobMenuEnum.REPORT, label: "Report job", icon: <FlagIcon/> },
        { value: JobMenuEnum.NOT_INTERESTED, label: "Not interest", icon: <NotAllowedIcon/> }
    ]
}


function JobItemMenu( { onClick, hasBeenSaved }: JobMenuProps ) {
    return (
        <Menu isLazy={ true }>
            <MenuButton
                as={ IconButton }
                variant={ "ghost" }>
                <HamburgerIcon/>
            </MenuButton>
            <MenuList>
                { getJobMenu( hasBeenSaved ).map( ( { label, value, icon } ) => (
                    <MenuItem
                        iconSpacing={ 6 }
                        icon={ icon }
                        key={ value }
                        onClick={ () => onClick( value ) }
                        children={ label }
                    />
                ) ) }
            </MenuList>
        </Menu>
    )
}

export default JobItemMenu
