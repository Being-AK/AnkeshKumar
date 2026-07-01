import React, { useState } from 'react';
import { 
  Lock, 
  FileText, 
  Loader2,
  CheckSquare,
  Square,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import UploadZone from './UploadZone';
import { formatFileSize } from './utils/fileHelpers';
import { readPdfDocument } from './utils/pdfHelpers';
import { validatePdfFile } from './utils/validation';
import WorkspaceHeader from './ui/WorkspaceHeader';
import AlertBanner from './ui/AlertBanner';
import FileList from './ui/FileList';

interface ProtectPdfToolProps {
  onClose: () => void;
}

export default function ProtectPdfTool({ onClose }: ProtectPdfToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [outputName, setOutputName] = useState<string>('protected_document.pdf');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Password Setup States
  const [userPassword, setUserPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  
  // Visibility States
  const [showUserPassword, setShowUserPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState<boolean>(false);

  // Permissions States
  const [allowPrinting, setAllowPrinting] = useState<boolean>(true);
  const [allowCopying, setAllowCopying] = useState<boolean>(true);
  const [allowEditing, setAllowEditing] = useState<boolean>(false);
  const [allowAnnotation, setAllowAnnotation] = useState<boolean>(true);

  // Since we know pdf-lib has a technical limitation on client-side standard PDF password-protection,
  // we will detect and explain this limit honestly.
  const isEncryptionSupported = false; 

  const handleFileChange = async (files: File[]) => {
    if (files.length === 0) return;
    const selectedFile = files[0];

    const validation = validatePdfFile(selectedFile);
    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }

    setFile(selectedFile);
    setValidationError(null);

    // Set default output name
    const baseName = selectedFile.name.replace(/\.pdf$/i, '');
    setOutputName(`${baseName}_protected.pdf`);

    try {
      const pdf = await readPdfDocument(selectedFile);
      const count = pdf.getPageCount();
      setTotalPages(count);
    } catch (err: any) {
      console.error('Error reading PDF pages for protection:', err);
      setValidationError('Could not read PDF details. The file might be password-protected already, encrypted, or corrupted.');
      setFile(null);
      setTotalPages(null);
    }
  };

  const getValidationErrorMsg = (): string | null => {
    if (!file) return null;
    if (!userPassword) {
      return 'User Password is required.';
    }
    if (userPassword.length < 4) {
      return 'User Password must be at least 4 characters long.';
    }
    if (userPassword !== confirmPassword) {
      return 'User Passwords do not match.';
    }
    if (ownerPassword && ownerPassword.length < 4) {
      return 'Owner Password must be at least 4 characters long if specified.';
    }
    return null;
  };

  const clearState = () => {
    setFile(null);
    setTotalPages(null);
    setUserPassword('');
    setConfirmPassword('');
    setOwnerPassword('');
    setValidationError(null);
  };

  const handleClose = () => {
    clearState();
    onClose();
  };

  const activeValidationError = getValidationErrorMsg() || validationError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-8 animate-scale-in relative">
        
        {/* Workspace Header */}
        <WorkspaceHeader
          title="Protect PDF Workspace"
          subtitle="Local secure sandboxing: Apply local access restrictions and permissions"
          icon={<Lock size={18} />}
          onClose={handleClose}
        />

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Drag and Drop Zone / File Info */}
          {!file ? (
            <UploadZone
              onFilesSelected={handleFileChange}
              accept={{ 'application/pdf': ['.pdf'] }}
              maxFiles={1}
              subtitle="Upload a PDF document to configure local password access and document restrictions"
            />
          ) : (
            <div className="space-y-6">
              
              {/* Loaded File List Component */}
              <FileList
                pdfFiles={[file]}
                onRemove={clearState}
                onClearAll={clearState}
                showIndexBadge={false}
                titleText="Target PDF Document"
              />

              {/* Password & Security configuration form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column: Password Inputs */}
                <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 border border-slate-150 dark:border-slate-800/60 rounded-2xl space-y-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-corporate dark:bg-gold rounded-full"></span>
                    <h4 className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Access Passwords</h4>
                  </div>

                  {/* User Password field */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex justify-between">
                      <span>User Password (Required to Open)</span>
                      <span className="text-[10px] text-slate-400 font-semibold">Min 4 chars</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showUserPassword ? 'text' : 'password'}
                        value={userPassword}
                        onChange={(e) => {
                          setUserPassword(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold pl-3.5 pr-10 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:border-corporate dark:focus:border-gold transition-colors shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 transition-colors"
                      >
                        {showUserPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm User Password field */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      Confirm User Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold pl-3.5 pr-10 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:border-corporate dark:focus:border-gold transition-colors shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Owner Password field */}
                  <div className="space-y-1.5 relative pt-1">
                    <div className="h-px bg-slate-200/60 dark:bg-slate-800/80 my-2"></div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex justify-between">
                      <span>Owner / Master Password (Optional)</span>
                      <span className="text-[10px] text-slate-400 font-semibold">Bypasses limits</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showOwnerPassword ? 'text' : 'password'}
                        value={ownerPassword}
                        onChange={(e) => {
                          setOwnerPassword(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold pl-3.5 pr-10 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:border-corporate dark:focus:border-gold transition-colors shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 transition-colors"
                      >
                        {showOwnerPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: PDF Permissions checkboxes */}
                <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 border border-slate-150 dark:border-slate-800/60 rounded-2xl space-y-4 flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-corporate dark:bg-gold rounded-full"></span>
                    <h4 className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Document Permissions</h4>
                  </div>

                  <div className="space-y-3 flex-1 justify-center flex flex-col">
                    {/* Allow Printing */}
                    <div 
                      onClick={() => setAllowPrinting(!allowPrinting)}
                      className="flex items-start gap-2.5 cursor-pointer select-none group"
                    >
                      <div className="text-corporate dark:text-gold shrink-0 mt-0.5">
                        {allowPrinting ? <CheckSquare size={16} /> : <Square size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-corporate dark:group-hover:text-gold transition-colors">
                          Allow Printing
                        </p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500">
                          Users can print high-quality copies of the PDF.
                        </p>
                      </div>
                    </div>

                    {/* Allow Copying */}
                    <div 
                      onClick={() => setAllowCopying(!allowCopying)}
                      className="flex items-start gap-2.5 cursor-pointer select-none group"
                    >
                      <div className="text-corporate dark:text-gold shrink-0 mt-0.5">
                        {allowCopying ? <CheckSquare size={16} /> : <Square size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-corporate dark:group-hover:text-gold transition-colors">
                          Allow Content Copying
                        </p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500">
                          Permits selecting and copying text or image content.
                        </p>
                      </div>
                    </div>

                    {/* Allow Editing */}
                    <div 
                      onClick={() => setAllowEditing(!allowEditing)}
                      className="flex items-start gap-2.5 cursor-pointer select-none group"
                    >
                      <div className="text-corporate dark:text-gold shrink-0 mt-0.5">
                        {allowEditing ? <CheckSquare size={16} /> : <Square size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-corporate dark:group-hover:text-gold transition-colors">
                          Allow Content Editing
                        </p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500">
                          Enables modifying form fields or text templates.
                        </p>
                      </div>
                    </div>

                    {/* Allow Annotation */}
                    <div 
                      onClick={() => setAllowAnnotation(!allowAnnotation)}
                      className="flex items-start gap-2.5 cursor-pointer select-none group"
                    >
                      <div className="text-corporate dark:text-gold shrink-0 mt-0.5">
                        {allowAnnotation ? <CheckSquare size={16} /> : <Square size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-corporate dark:group-hover:text-gold transition-colors">
                          Allow Commenting & Annotation
                        </p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500">
                          Permits drawing, highlighting, and writing comments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Technical Honesty Banner: pdf-lib doesn't support password encryption natively in browser */}
              {!isEncryptionSupported && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-5 flex gap-4 items-start animate-fade-in shadow-sm">
                  <span className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-450 rounded-xl shrink-0">
                    <ShieldAlert size={20} />
                  </span>
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                      Technical Architecture Alert
                    </h5>
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                      Standard PDF password encryption is a complex cryptographic filter standard (utilizing RC4/AES algorithms and specialized PDF-compliant security dictionaries). This sandboxed applet operates entirely on the client-side inside your browser for complete data safety.
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                      Because our core client-side parsing library (<span className="font-bold">pdf-lib</span>) does not natively support PDF security handler creation or standard password-protection streams, we are unable to compiled-encrypt this PDF locally. 
                    </p>
                    <p className="text-[11px] text-amber-600 dark:text-amber-500 italic font-semibold">
                      In accordance with our strict data-honesty values, we do not fake or simulate password-protection overlays, nor do we route your private files to unsafe third-party servers. The protect action has been disabled.
                    </p>
                  </div>
                </div>
              )}

              {/* Output filename setup */}
              <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-150 dark:border-slate-800/60 rounded-2xl space-y-3">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-corporate dark:bg-gold rounded-full"></span>
                  <h4 className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Output File Setup</h4>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={outputName}
                    onChange={(e) => setOutputName(e.target.value)}
                    placeholder="protected_document.pdf"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:border-corporate dark:focus:border-gold transition-colors shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Status and Notifications */}
          {activeValidationError && (
            <AlertBanner type="error" message={activeValidationError} />
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-3 bg-slate-50/30 dark:bg-slate-950/10 shrink-0">
          <button
            onClick={handleClose}
            className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-350 font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer border border-slate-150 dark:border-slate-800/60"
          >
            Close Workspace
          </button>
          
          <button
            disabled={true}
            className="font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-none bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-150 dark:border-slate-800/50 cursor-not-allowed"
            title="Standard client-side encryption is currently unsupported by the core library."
          >
            <Lock size={14} />
            <span>Encryption Unsupported</span>
          </button>
        </div>

      </div>
    </div>
  );
}
