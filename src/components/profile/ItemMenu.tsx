import { Menu, MenuButton, MenuItem, MenuList, } from "@chakra-ui/react"
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import React from "react";
import { CRUDActions } from "../../types";

type Props = {
    onClick( action: Exclude<CRUDActions, CRUDActions.CREATE> ): void
}

function ItemMenu( { onClick }: Props ) {
    return (
        <Menu isLazy={ true }>
            <MenuButton
                variant={ "ghost" }
                as={ IconButton }
                aria-label="Options"
                icon={ <HamburgerIcon/> }
            />
            <MenuList>
                <MenuItem
                    icon={ <EditIcon/> }
                    iconSpacing={ 6 }
                    onClick={ () => onClick( CRUDActions.EDIT ) }>
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={ () => onClick( CRUDActions.DELETE ) }
                    icon={ <DeleteIcon/> }
                    iconSpacing={ 6 }>
                    Delete
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ItemMenu
