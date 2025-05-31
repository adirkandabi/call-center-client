import React, { useState } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import { useTags } from "../context/tagContext";

import type Tag from "../interfaces/Tag";

interface TagsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (tag: Tag) => void;
  selectedTags: Tag[] | undefined;
}

export default function TagsMenu({
  anchorEl,
  onClose,
  onSelect,
  selectedTags,
}: TagsMenuProps) {
  const { tags } = useTags();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    onClose();
  };

  const handleSelect = (tag: Tag) => {
    onSelect(tag);
    handleClose();
  };

  return (
    <Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 5,
            boxShadow: 3,
            padding: 2,
            minWidth: 160,
            maxHeight: 200,
            overflowY: "auto",
          },
        }}
      >
        {tags.length > 0 ? (
          tags
            .filter((tag) => !selectedTags?.some((t) => t._id === tag._id))
            .map((tag) => (
              <MenuItem
                key={tag._id}
                onClick={() => handleSelect(tag)}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  marginY: 0.5,
                  justifyContent: "center",
                  fontWeight: 500,
                }}
              >
                {tag.title}
              </MenuItem>
            ))
        ) : (
          <p className="empty-msg">No tags, add one first.</p>
        )}
      </Menu>
    </Box>
  );
}
