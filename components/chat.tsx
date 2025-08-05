"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ToolCall from "./tool-call";
import Message from "./message";
import Annotations from "./annotations";
import McpToolsList from "./mcp-tools-list";
import McpApproval from "./mcp-approval";
import FileUpload from "./file-upload";
import useToolsStore from "@/stores/useToolsStore";
import { Item, McpApprovalRequestItem } from "@/lib/assistant";
import LoadingMessage from "./loading-message";
import useConversationStore from "@/stores/useConversationStore";

interface ChatProps {
  items: Item[];
  onSendMessage: (message: string) => void;
  onApprovalResponse: (approve: boolean, id: string) => void;
}

const Chat: React.FC<ChatProps> = ({
  items,
  onSendMessage,
  onApprovalResponse,
}) => {
  const itemsEndRef = useRef<HTMLDivElement>(null);
  const [inputMessageText, setinputMessageText] = useState<string>("");
  // This state is used to provide better user experience for non-English IMEs such as Japanese
  const [isComposing, setIsComposing] = useState(false);
  const { isAssistantLoading } = useConversationStore();
  const { vectorStore, setVectorStore } = useToolsStore();

  const handleAddStore = async (storeId: string) => {
    if (storeId.trim()) {
      const newStore = await fetch(
        `/api/vector_stores/retrieve_store?vector_store_id=${storeId}`
      ).then((res) => res.json());
      if (newStore.id) {
        console.log("Retrieved store:", newStore);
        setVectorStore(newStore);
      } else {
        alert("Vector store not found");
      }
    }
  };

  const unlinkStore = async () => {
    setVectorStore({
      id: "",
      name: "",
    });
  };

  const scrollToBottom = () => {
    itemsEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey && !isComposing) {
        event.preventDefault();
        onSendMessage(inputMessageText);
        setinputMessageText("");
      }
    },
    [onSendMessage, inputMessageText, isComposing]
  );

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === "tool_call" ? (
                <ToolCall toolCall={item} />
              ) : item.type === "message" ? (
                <div className="flex flex-col gap-1">
                  <Message message={item} />
                  {item.content &&
                    item.content[0].annotations &&
                    item.content[0].annotations.length > 0 && (
                      <Annotations
                        annotations={item.content[0].annotations}
                      />
                    )}
                </div>
              ) : item.type === "mcp_list_tools" ? (
                process.env.NODE_ENV === "development" ? <McpToolsList item={item} /> : null
              ) : item.type === "mcp_approval_request" ? (
                <McpApproval
                  item={item as McpApprovalRequestItem}
                  onRespond={onApprovalResponse}
                />
              ) : null}
            </React.Fragment>
          ))}
          {isAssistantLoading && <LoadingMessage />}
          <div ref={itemsEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex w-full flex-col gap-1.5 rounded-[20px] p-3 transition-colors bg-white border border-gray-300 shadow-sm">
            <div className="flex items-end gap-3">
              <FileUpload
                vectorStoreId={vectorStore?.id ?? ""}
                vectorStoreName={vectorStore?.name ?? ""}
                onAddStore={(id) => handleAddStore(id)}
                onUnlinkStore={() => unlinkStore()}
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <textarea
                  id="prompt-textarea"
                  tabIndex={0}
                  dir="auto"
                  rows={1}
                  placeholder="Message..."
                  className="resize-none border-0 focus:outline-none text-base bg-transparent px-0 py-2 min-h-[24px] max-h-32"
                  style={{ fieldSizing: 'content' } as any}
                  value={inputMessageText}
                  onChange={(e) => setinputMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                />
              </div>
              <button
                disabled={!inputMessageText}
                data-testid="send-button"
                className="flex size-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100"
                onClick={() => {
                  onSendMessage(inputMessageText);
                  setinputMessageText("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 32 32"
                  className="icon-md"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
