"use client";

import React, { useState, useEffect } from 'react';
import { Copy, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShareModalProps {
  searchUid: string;
  onClose: () => void;
}

export default function ShareModal({ searchUid, onClose }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const baseUrl = window.location.origin;
    setShareUrl(`${baseUrl}/smart-car-finder?sid=${searchUid}`);
  }, [searchUid]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const text = "Check out this car recommendation from CarReb!";
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);
    
    let socialUrl = '';
    
    switch (platform) {
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        socialUrl = `mailto:?subject=${encodedText}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
    }
    
    if (socialUrl) {
      window.open(socialUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Car Match
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="share-url">Share Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button onClick={handleCopy} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 mt-1">Link copied to clipboard!</p>
            )}
          </div>
          
          <div>
            <Label>Share on Social Media</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button
                variant="outline"
                onClick={() => handleSocialShare('twitter')}
                className="justify-start"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('facebook')}
                className="justify-start"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('linkedin')}
                className="justify-start"
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('email')}
                className="justify-start"
              >
                Email
              </Button>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-800">
              Anyone with this link can view your car search results and see how CarReb can help them make smarter car choices too!
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
