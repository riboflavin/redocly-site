import * as React from 'react';
import type { IconProps as ThemeIconProps } from '@redocly/theme/icons/types';
import { CertificateIcon } from '@redocly/theme/icons/CertificateIcon/CertificateIcon';
import { CheckboxFilledIcon } from '@redocly/theme/icons/CheckboxFilledIcon/CheckboxFilledIcon';
import { CloseFilledIcon } from '@redocly/theme/icons/CloseFilledIcon/CloseFilledIcon';
import { CloseOutlineIcon } from '@redocly/theme/icons/CloseOutlineIcon/CloseOutlineIcon';
import { ColorPaletteIcon } from '@redocly/theme/icons/ColorPaletteIcon/ColorPaletteIcon';
import { DataRefineryIcon } from '@redocly/theme/icons/DataRefineryIcon/DataRefineryIcon';
import { DeselectIcon } from '@redocly/theme/icons/DeselectIcon/DeselectIcon';
import { DocumentAddIcon } from '@redocly/theme/icons/DocumentAddIcon/DocumentAddIcon';
import { DocumentBlankIcon } from '@redocly/theme/icons/DocumentBlankIcon/DocumentBlankIcon';
import { DocumentIcon } from '@redocly/theme/icons/DocumentIcon/DocumentIcon';
import { DownloadIcon } from '@redocly/theme/icons/DownloadIcon/DownloadIcon';
import { DraggableIcon } from '@redocly/theme/icons/DraggableIcon/DraggableIcon';
import { EditIcon } from '@redocly/theme/icons/EditIcon/EditIcon';
import { EmailIcon } from '@redocly/theme/icons/EmailIcon/EmailIcon';
import { ErrorFilledIcon } from '@redocly/theme/icons/ErrorFilledIcon/ErrorFilledIcon';
import { ErrorIcon } from '@redocly/theme/icons/ErrorIcon/ErrorIcon';
import { ExportIcon } from '@redocly/theme/icons/ExportIcon/ExportIcon';
import { FaceDissatisfiedIcon } from '@redocly/theme/icons/FaceDissatisfiedIcon/FaceDissatisfiedIcon';
import { FaceNeutralIcon } from '@redocly/theme/icons/FaceNeutralIcon/FaceNeutralIcon';
import { FaceSatisfiedIcon } from '@redocly/theme/icons/FaceSatisfiedIcon/FaceSatisfiedIcon';
import { FileIcon } from '@redocly/theme/icons/FileIcon/FileIcon';
import { FileStorageIcon } from '@redocly/theme/icons/FileStorageIcon/FileStorageIcon';
import { FilterIcon } from '@redocly/theme/icons/FilterIcon/FilterIcon';
import { FlowIcon } from '@redocly/theme/icons/FlowIcon/FlowIcon';
import { FolderAddIcon } from '@redocly/theme/icons/FolderAddIcon/FolderAddIcon';
import { FolderIcon } from '@redocly/theme/icons/FolderIcon/FolderIcon';
import { FolderMoveToIcon } from '@redocly/theme/icons/FolderMoveToIcon/FolderMoveToIcon';
import { GlobalOutlinedIcon } from '@redocly/theme/icons/GlobalOutlinedIcon/GlobalOutlinedIcon';
import { HashtagIcon } from '@redocly/theme/icons/HashtagIcon/HashtagIcon';
import { HorizontalViewIcon } from '@redocly/theme/icons/HorizontalViewIcon/HorizontalViewIcon';
import { IBMCloudHyperProtectCryptoServicesIcon } from '@redocly/theme/icons/IBMCloudHyperProtectCryptoServicesIcon/IBMCloudHyperProtectCryptoServicesIcon';
import { InformationFilledIcon } from '@redocly/theme/icons/InformationFilledIcon/InformationFilledIcon';
import { InformationIcon } from '@redocly/theme/icons/InformationIcon/InformationIcon';
import { JsonIcon } from '@redocly/theme/icons/JsonIcon/JsonIcon';
import { LaunchIcon } from '@redocly/theme/icons/LaunchIcon/LaunchIcon';
import { LinkIcon } from '@redocly/theme/icons/LinkIcon/LinkIcon';
import { LogoutIcon } from '@redocly/theme/icons/LogoutIcon/LogoutIcon';
import { MaximizeIcon } from '@redocly/theme/icons/MaximizeIcon/MaximizeIcon';
import { MenuIcon } from '@redocly/theme/icons/MenuIcon/MenuIcon';
import { MinimizeIcon } from '@redocly/theme/icons/MinimizeIcon/MinimizeIcon';
import { MobileSidebarIcon } from '@redocly/theme/icons/MobileSidebarIcon/MobileSidebarIcon';
import { MoonIcon } from '@redocly/theme/icons/MoonIcon/MoonIcon';
import { OverflowMenuHorizontalIcon } from '@redocly/theme/icons/OverflowMenuHorizontalIcon/OverflowMenuHorizontalIcon';
import { OverflowMenuVerticalIcon } from '@redocly/theme/icons/OverflowMenuVerticalIcon/OverflowMenuVerticalIcon';
import { PlaylistIcon } from '@redocly/theme/icons/PlaylistIcon/PlaylistIcon';
import { PlusCustomIcon } from '@redocly/theme/icons/PlusCustomIcon/PlusCustomIcon';
import { RecentlyViewedIcon } from '@redocly/theme/icons/RecentlyViewedIcon/RecentlyViewedIcon';
import { RenewIcon } from '@redocly/theme/icons/RenewIcon/RenewIcon';
import { ResetIcon } from '@redocly/theme/icons/ResetIcon/ResetIcon';
import { RestartIcon } from '@redocly/theme/icons/RestartIcon/RestartIcon';
import { RocketIcon } from '@redocly/theme/icons/RocketIcon/RocketIcon';
import { SaveIcon } from '@redocly/theme/icons/SaveIcon/SaveIcon';
import { SearchIcon } from '@redocly/theme/icons/SearchIcon/SearchIcon';
import { SecurityIcon } from '@redocly/theme/icons/SecurityIcon/SecurityIcon';
import { SelectIcon } from '@redocly/theme/icons/SelectIcon/SelectIcon';
import { SettingsCogIcon } from '@redocly/theme/icons/SettingsCogIcon/SettingsCogIcon';
import { SettingsIcon } from '@redocly/theme/icons/SettingsIcon/SettingsIcon';
import { SidePanelCloseIcon } from '@redocly/theme/icons/SidePanelCloseIcon/SidePanelCloseIcon';
import { SidePanelOpenIcon } from '@redocly/theme/icons/SidePanelOpenIcon/SidePanelOpenIcon';
import { SpinnerIcon } from '@redocly/theme/icons/SpinnerIcon/SpinnerIcon';
import { StarFilledIcon } from '@redocly/theme/icons/StarFilledIcon/StarFilledIcon';
import { StarIcon } from '@redocly/theme/icons/StarIcon/StarIcon';
import { SubtractIcon } from '@redocly/theme/icons/SubtractIcon/SubtractIcon';
import { SunIcon } from '@redocly/theme/icons/SunIcon/SunIcon';
import { TableBuiltIcon } from '@redocly/theme/icons/TableBuiltIcon/TableBuiltIcon';
import { TaskViewIcon } from '@redocly/theme/icons/TaskViewIcon/TaskViewIcon';
import { TimeIcon } from '@redocly/theme/icons/TimeIcon/TimeIcon';
import { TrashCanIcon } from '@redocly/theme/icons/TrashCanIcon/TrashCanIcon';
import { UserIcon } from '@redocly/theme/icons/UserIcon/UserIcon';
import { ValueVariableIcon } from '@redocly/theme/icons/ValueVariableIcon/ValueVariableIcon';
import { VerticalViewIcon } from '@redocly/theme/icons/VerticalViewIcon/VerticalViewIcon';
import { ViewIcon } from '@redocly/theme/icons/ViewIcon/ViewIcon';
import { ViewOffIcon } from '@redocly/theme/icons/ViewOffIcon/ViewOffIcon';
import { WarningAltFilledIcon } from '@redocly/theme/icons/WarningAltFilledIcon/WarningAltFilledIcon';
import { WarningAltIcon } from '@redocly/theme/icons/WarningAltIcon/WarningAltIcon';
import { WarningFilledIcon } from '@redocly/theme/icons/WarningFilledIcon/WarningFilledIcon';
import { WarningSquareIcon } from '@redocly/theme/icons/WarningSquareIcon/WarningSquareIcon';
import { WorkflowAutomationIcon } from '@redocly/theme/icons/WorkflowAutomationIcon/WorkflowAutomationIcon';

// The icons that the icons page shows. Add an icon here when you add it to that page.
const Icons: Record<string, React.ComponentType<ThemeIconProps>> = {
  CertificateIcon,
  CheckboxFilledIcon,
  CloseFilledIcon,
  CloseOutlineIcon,
  ColorPaletteIcon,
  DataRefineryIcon,
  DeselectIcon,
  DocumentAddIcon,
  DocumentBlankIcon,
  DocumentIcon,
  DownloadIcon,
  DraggableIcon,
  EditIcon,
  EmailIcon,
  ErrorFilledIcon,
  ErrorIcon,
  ExportIcon,
  FaceDissatisfiedIcon,
  FaceNeutralIcon,
  FaceSatisfiedIcon,
  FileIcon,
  FileStorageIcon,
  FilterIcon,
  FlowIcon,
  FolderAddIcon,
  FolderIcon,
  FolderMoveToIcon,
  GlobalOutlinedIcon,
  HashtagIcon,
  HorizontalViewIcon,
  IBMCloudHyperProtectCryptoServicesIcon,
  InformationFilledIcon,
  InformationIcon,
  JsonIcon,
  LaunchIcon,
  LinkIcon,
  LogoutIcon,
  MaximizeIcon,
  MenuIcon,
  MinimizeIcon,
  MobileSidebarIcon,
  MoonIcon,
  OverflowMenuHorizontalIcon,
  OverflowMenuVerticalIcon,
  PlaylistIcon,
  PlusCustomIcon,
  RecentlyViewedIcon,
  RenewIcon,
  ResetIcon,
  RestartIcon,
  RocketIcon,
  SaveIcon,
  SearchIcon,
  SecurityIcon,
  SelectIcon,
  SettingsCogIcon,
  SettingsIcon,
  SidePanelCloseIcon,
  SidePanelOpenIcon,
  SpinnerIcon,
  StarFilledIcon,
  StarIcon,
  SubtractIcon,
  SunIcon,
  TableBuiltIcon,
  TaskViewIcon,
  TimeIcon,
  TrashCanIcon,
  UserIcon,
  ValueVariableIcon,
  VerticalViewIcon,
  ViewIcon,
  ViewOffIcon,
  WarningAltFilledIcon,
  WarningAltIcon,
  WarningFilledIcon,
  WarningSquareIcon,
  WorkflowAutomationIcon,
};

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export function ThemeIcon({ name, size = 24, color = 'currentColor' }: IconProps) {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent size={`${size}px`} color={color} style={{ width: size, height: size }} />;
}
