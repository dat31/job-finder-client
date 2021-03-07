import { Job, JobMenuEnum } from "../../types";
import React, { ReactElement } from "react";
import { BookMarkIcon, CloseIcon, FlagIcon } from "../icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type JobMenuProps = {
    onClick( menu: JobMenuEnum, jobId: Job["id"] ): void
    jobId: Job["id"]
}

function getMenuIcon( jobMenuItem: JobMenuEnum ): ReactElement | undefined {
    switch( jobMenuItem ) {
        case JobMenuEnum.REPORT: {
            return <FlagIcon/>
        }
        case JobMenuEnum.SAVE: {
            return <BookMarkIcon/>
        }
        case JobMenuEnum.NOT_INTERESTED: {
            return <CloseIcon/>
        }
        default:
            return undefined
    }
}

const jobMenus = Object
    .entries( JobMenuEnum )
    .map( ( [ value, label ] ) => ( {
        label,
        value,
        icon: getMenuIcon( label )
    } ) )

function JobItemMenu( { onClick, jobId }: JobMenuProps ) {
    return (
        <Menu isLazy={ true }>
            <MenuButton
                as={ IconButton }
                variant={ "ghost" }>
                <HamburgerIcon/>
            </MenuButton>
            <MenuList>
                { jobMenus.map( ( { label, value, icon } ) => (
                    <MenuItem
                        iconSpacing={ 6 }
                        icon={ icon }
                        key={ value }
                        onClick={ () => onClick( label, jobId ) }
                        children={ label }
                    />
                ) ) }
            </MenuList>
        </Menu>
    )
}

export default JobItemMenu
